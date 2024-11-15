import { fileURLToPath } from 'url';
import path from 'path';
import fluentFFmpeg from 'fluent-ffmpeg';
import AstraChannel from "../Models/AstraChannel.js";
import { v4 as uuidv4 } from 'uuid';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio actual
const __dirname = path.dirname(__filename);

const astraChannelController = {
  // Obtener todos los canales con el flujo HLS procesado
  getAllChannels: async (request, response, next) => {
    try {
      const channels = await AstraChannel.find();

      for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        const hlsUrl = channel.url;

        if (hlsUrl && hlsUrl.startsWith('http')) {
          // Modificar la URL para apuntar al flujo procesado
          channel.processedUrl = await processHlsWithFFmpeg(hlsUrl, true); // Indicamos que guardamos el archivo
        } else {
          channel.processedUrl = null;
        }
      }

      response.status(201).json({ response: channels });

    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error.message });
    }
  },

  // Obtener un solo canal con el flujo HLS procesado
  getOneChannel: async (request, response, next) => {
    const { id } = request.params;
    try {
      const channel = await AstraChannel.findById({ _id: id });

      if (!channel) {
        return response.status(404).json({ error: 'Canal no encontrado' });
      }

      const hlsUrl = channel.url;
      if (hlsUrl && hlsUrl.startsWith('http')) {
        // Procesar el flujo HLS y obtener una URL del flujo convertido
        channel.processedUrl = await processHlsWithFFmpeg(hlsUrl, false);  // Indicamos que no guardamos el archivo
      } else {
        channel.processedUrl = null;
      }

      response.status(200).json({ response: channel });

    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error.message });
    }
  },

  
  createChannel: async (request, response, next) => { try {
    const channel = await Channel.create(request.body);
    response.status(201).json({
        response: channel
    })} catch (err) {
        response.status(500).json({ error: err })
    }
},

updateChannel: async (request, response, next) => { 
    const { id } = request.params;
    let channel;
    let error = null;
    let success= true;
    try {
        channel = await Channel.findByIdAndUpdate({_id: id}, request.body, { new: true });
    } catch (e) {
        console.log(e);
        success = false;
        error = e;
    }
    response.json(
        {
            response: channel,
            success,
            error
        }
    );

},

deleteChannel: async (request, response, next) => {
    const { id } = request.params;
    let channel;
    let error = null;
    let success= true;
   
   try{
    channel= await Channel.findOneAndDelete({_id: id});
    response.json({response: channel, success: true});
   }catch (e) {
  console.log(e);
  success= false;
  error=e;
  next(e);
    }
}
};

// Función para procesar el flujo HLS con FFmpeg y devolver la URL procesada
async function processHlsWithFFmpeg(hlsUrl, saveToDisk) {
  return new Promise((resolve, reject) => {
    // Generar un nombre único para el archivo de salida
    const outputFileName = `processed_${uuidv4()}.mp4`;
    const outputPath = path.join(__dirname, '..', 'uploads', outputFileName);

    if (saveToDisk) {
      // Guardar el archivo procesado en el disco (si se desea guardar)
      fluentFFmpeg(hlsUrl)
        .output(outputPath)
        .format('mp4')
        .videoCodec('libx264')
        .audioCodec('aac')
        .on('start', (commandLine) => {
          console.log('FFmpeg ejecutando: ' + commandLine);
        })
        .on('error', (err) => {
          console.error('Error al procesar el flujo:', err);
          reject('Error procesando el flujo');
        })
        .on('end', () => {
          console.log('Flujo procesado con éxito');
          // Devolver la URL del archivo procesado guardado
          resolve(`http://localhost:5000/uploads/${outputFileName}`);
        })
        .run();
    } else {
      // Transmitir el flujo directamente (sin guardarlo)
      const processedStreamUrl = `http://localhost:5000/stream?url=${encodeURIComponent(hlsUrl)}`;
      resolve(processedStreamUrl);
    }
  });
}

export default astraChannelController;
