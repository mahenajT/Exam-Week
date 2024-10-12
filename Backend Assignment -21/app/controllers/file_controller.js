import fs from "fs";
import path from "path";

// Controller to handle file upload
export const fileUpload = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded." });
  }
  response
    .status(200)
    .json({ message: "File uploaded successfully.", file: request.file });
};

// Controller to read a file by its name
export const fileRead = (request, response) => {
  const filePath = path.join("uploads", request.params.filename);

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      return response.status(404).json({ message: "File not found." });
    }

    const ext = path.extname(filePath).toLowerCase();
    let contentType;

    // Set the appropriate content type based on the file extension
    switch (ext) {
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".bmp":
        contentType = "image/bmp";
        break;
      case ".svg":
        contentType = "image/svg+xml";
        break;
      default:
        contentType = "application/octet-stream"; // Fallback content type
        break;
    }

    response.setHeader("Content-Type", contentType);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(response);
  });
};

// Controller to delete a file by its name
export const fileDelete = (request, response) => {
  const filePath = path.join("uploads", request.params.filename);

  fs.unlink(filePath, (error) => {
    if (error) {
      return response
        .status(404)
        .json({ message: "File not found or could not be deleted." });
    }
    response.status(200).json({ message: "File deleted successfully." });
  });
};
