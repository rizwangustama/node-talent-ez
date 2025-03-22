import express from "express";
import Controller from "./controller";
import multer from "multer";
const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router()
const controller = new Controller()

router.get("", controller.index)
router.get("/:id", controller.show)
router.post("", upload.single("identity_file"), controller.create)
router.put("/:id", upload.single("identity_file"), controller.update)
router.delete("/:id", controller.delete)

export default router