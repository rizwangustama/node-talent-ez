import express from "express";
import Controller from "./controller";
import multer from "multer";
const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router()
const controller = new Controller()

router.get("", controller.index)
router.post("/apply", upload.single("resume"), controller.apply)
router.get("/:id", controller.show)
router.post("", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

export default router