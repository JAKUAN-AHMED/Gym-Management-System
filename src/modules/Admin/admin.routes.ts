import { Router } from "express";
import { AdminController } from "./admin.controller";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/ValidateRequest";
import { ClassValidation } from "../Class/class.validation";
import { ClassController } from "../Class/class.controller";

const router=Router();


router.patch('/manage-user/:id',auth(USER_ROLE.admin),AdminController.changeRole)

router.delete('/delete-user/:userId',auth(USER_ROLE.admin),AdminController.deleteUser)

//create class
router.post('/create-class',auth(USER_ROLE.admin),validateRequest(ClassValidation),ClassController.createClass);


//schedule class
router.post('/schedule/:classId',auth(USER_ROLE.admin),ClassController.createScheduleClass)
export const AdminRoutes=router;