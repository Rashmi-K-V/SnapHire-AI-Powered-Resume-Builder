'use strict';

module.exports = {
  async parse(ctx) {
    return ctx.send({ message: 'Parse route works ✅' });
  },

  async uploadAndParse(ctx) {
    try {
      const { resume } = ctx.request.files;

      if (!resume) {
        return ctx.badRequest('No resume file uploaded');
      }

      // Upload the file using Strapi's upload plugin
      const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
        data: {},
        files: resume,
      });

      const uploadedFile = uploadedFiles[0];
      const fileUrl = uploadedFile?.url;

      if (!fileUrl) {
        throw new Error('File upload failed or URL not found');
      }

      // Call service to parse
      const parsedData = await strapi.service('api::parse-resume.parse-resume').parseFromUrl(fileUrl);

      return ctx.send({
        message: 'Resume uploaded and parsed successfully',
        file: uploadedFile,
        parsed: parsedData,
      });
    } catch (error) {
      strapi.log.error('❌ Upload & Parse Error:', error);
      return ctx.internalServerError('Something went wrong during upload and parse');
    }
  },
};
