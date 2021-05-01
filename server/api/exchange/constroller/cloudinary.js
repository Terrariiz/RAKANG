const cloudinary = require('cloudinary');



cloudinary.config({
    cloud_name: "koladon52",
    api_key: "413217853994171",
    api_secret: "DOHByZlRxxocIbvEmAzgnvmnv-E",
  
  })

  exports.uploads = (file) => {
    return new Promise(resolve => {
      cloudinary.uploader.upload(file,(result) => {
        resolve({
            image: result.url,
            cloudinary_id: result.public_id,
        })
      })
      })
  }