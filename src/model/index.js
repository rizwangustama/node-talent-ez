import {
    connection
} from "../driver/database";

import * as Company from "./company"
import * as InvoiceCharge from "./invoice_charge"
import * as Invoice from "./invoice"
import * as JobPostingQNA from "./job_posting_qna"
import * as JobPostingShareInvoice from "./job_posting_share_invoice"
import * as JobPostingShare from "./job_posting_share"
import * as JobPosting from "./job_posting"
import * as Obj from "./object"
import * as Recruiter from "./recruiter"
import * as Reference from "./reference"
import * as Role from "./role"
import * as TalentAchievement from "./talent_achievement"
import * as TalentApply from "./talent_apply"
import * as TalentExperience from "./talent_experience"
import * as TalentPool from "./talent_pool"
import * as TalentUrl from "./talent_url"
import * as Talent from "./talent"
import * as User from "./user"


const model_pckgs = {
    Company,
    InvoiceCharge,
    Invoice,
    JobPostingQNA,
    JobPostingShareInvoice,
    JobPostingShare,
    JobPosting,
    Obj: Obj,
    Recruiter,
    Reference,
    Role,
    TalentAchievement,
    TalentApply,
    TalentExperience,
    TalentPool,
    TalentUrl,
    Talent,
    User,
}

const models = {}

Object.keys(model_pckgs).forEach(key => {
    models[key] = model_pckgs[key].model(connection)
})
  
Object.keys(models).forEach(key => {
    if ('associate' in model_pckgs[key]) {
        model_pckgs[key].associate(models[key], models)
    }
})

export default models

export {
    connection
}