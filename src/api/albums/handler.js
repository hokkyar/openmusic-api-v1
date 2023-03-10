class AlbumsHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload)
    const albumId = await this._service.addAlbum(request.payload)
    return h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId
      }
    }).code(201)
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params
    const album = await this._service.getAlbumById(id)
    return {
      status: 'success',
      data: {
        album
      }
    }
  }

  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload)
    const { id } = request.params
    await this._service.editAlbumById(id, request.payload)
    return {
      status: 'success',
      message: 'Album berhasil diperbarui'
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params
    await this._service.deleteAlbumById(id)
    return {
      status: 'success',
      message: 'Album berhasil dihapus'
    }
  }
}

module.exports = AlbumsHandler
