import express from "express"
import { editCatalog,addCatalog,GetCatalog, delCatalog} from "../controllers/catalog.controller.js"
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
const router=express.Router()

router.post("/add", protectRoute, adminRoute, addCatalog);
router.put("/edit/:id", protectRoute, adminRoute, editCatalog);
router.delete("/delete/:id", protectRoute, adminRoute, delCatalog);
router.get("/retrive",GetCatalog); 

export default router