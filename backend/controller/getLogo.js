

const getLogo = (req,res)=>{
    try {
        // Use import.meta.url to get the current file's URL,
        // then convert it to the file path using fileURLToPath.
        const currentFilePath = fileURLToPath(import.meta.url);
    
        // Get the directory name using the dirname function.
        const currentDir = dirname(currentFilePath);
    
        // Create the path to the logo.png file.
        const imagePath = path.join(currentDir, "logo.jpg");
    
        // Send the file as a response
        res.sendFile(imagePath);
      } catch (error) {
        console.error("Error serving logo.png:", error);
        res.status(500).send("Internal Server Error");
      }
}

export default getLogo;