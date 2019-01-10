const decompress = require('decompress');
const decompressTar = require('decompress-tar');
 
decompress('../../data/tar/sampleTarFile.tar', '.', {
    plugins: [
        decompressTar()
    ]
}).then(() => {
    console.log('Files decompressed');
});

