import catalog from "../model/catalog.model.js";
import cloudinary from '../lib/cloudinary.js';

export const addCatalog = async (req, res) => {
  try {
    const { plantName, description, diseases, image } = req.body;

    if (!plantName || !description || !diseases.length>0 || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const createCatalog = await catalog.create({
      plantName,
      image, 
      description,
      diseases
    });

    res.status(201).json({
      success: true,
      data: createCatalog
    });

  } catch (error) {
    console.error("Catalog was not added: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export const GetCatalog = async (req, res) => {
  try {
    const catalogs = await catalog.find();
    res.status(200).json({ success: true, data: catalogs });
  } catch (error) {
    console.log("something went wrong:not fetching data")
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editCatalog = async (req, res) => {
  try {
    const { id } = req.params;
    const { plantName, description, diseases, image } = req.body;

    const catalogItem = await catalog.findById(id);
    if (!catalogItem) {
      return res.status(404).json({ success: false, message: "Catalog not found" });
    }

   let imageUrl = catalogItem.image;
    if (image) {
      imageUrl = image; 
    }

    
    // field haru update gareko. id new change with naya nor existed field will take place
    catalogItem.plantName = plantName || catalogItem.plantName;
    catalogItem.description = description || catalogItem.description;
    catalogItem.diseases = diseases || catalogItem.diseases;
    catalogItem.image = imageUrl;

    await catalogItem.save();

    res.status(200).json({ success: true, data: catalogItem });

  } catch (error) {
    console.error("Catalog update failed: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const delCatalog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await catalog.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Catalog not found" });
    }
    res.status(200).json({ success: true, message: "Catalog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};