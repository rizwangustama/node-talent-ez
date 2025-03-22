import express from "express"
import * as middleware from "./../../deliveries/api/middleware";

const router = express.Router()

import company from "./company/router"
import invoiceCharge from "./invoice_charge/router"
import invoice from "./invoice/router"
import jobPostingQNA from "./job_posting_qna/router"
import jobPostingShareInvoice from "./job_posting_share_invoice/router"
import jobPostingShare from "./job_posting_share/router"
import jobPosting from "./job_posting/router"
import object from "./object/router"
import recruiter from "./recruiter/router"
import reference from "./reference/router"
import role from "./role/router"
import talentAchievement from "./talent_achievement/router"
import talentApply from "./talent_apply/router"
import talentExperience from "./talent_experience/router"
import talentPool from "./talent_pool/router"
import talentUrl from "./talent_url/router"
import talent from "./talent/router"
import user from "./user/router"
import auth from "./auth/router"

// router.use('/companies',middleware.jwt, company);
// router.use('/invoices',middleware.jwt, invoice);
// router.use('/invoice-charges',middleware.jwt, invoiceCharge);
// router.use('/job-postings',middleware.jwt, jobPosting);
// router.use('/job-posting-qnas',middleware.jwt, jobPostingQNA);
// router.use('/job-posting-share',middleware.jwt, jobPostingShare);
// router.use('/job-posting-share-invoices',middleware.jwt, jobPostingShareInvoice);
// router.use('/objects',middleware.jwt, object);
// router.use('/recruiters',middleware.jwt, recruiter);
// router.use('/references',middleware.jwt, reference);
// router.use('/roles',middleware.jwt, role);
// router.use('/talents',middleware.jwt, talent);
// router.use('/talent-achievements',middleware.jwt, talentAchievement);
// router.use('/talent-applies',middleware.jwt, talentApply);
// router.use('/talent-experiences',middleware.jwt, talentExperience);
// router.use('/talent-pools',middleware.jwt, talentPool);
// router.use('/talent-urls',middleware.jwt, talentUrl);
// router.use('/users', middleware.jwt, user);
// router.use('/auth', auth);


router.use('/companies', company);
router.use('/invoices', invoice);
router.use('/invoice-charges', invoiceCharge);
router.use('/job-postings', jobPosting);
router.use('/job-posting-qnas', jobPostingQNA);
router.use('/job-posting-share', jobPostingShare);
router.use('/job-posting-share-invoices', jobPostingShareInvoice);
router.use('/objects', object);
router.use('/recruiters', recruiter);
router.use('/references', reference);
router.use('/roles', role);
router.use('/talents', talent);
router.use('/talent-achievements', talentAchievement);
router.use('/talent-applies', talentApply);
router.use('/talent-experiences', talentExperience);
router.use('/talent-pools', talentPool);
router.use('/talent-urls', talentUrl);
router.use('/users',  user);
router.use('/auth', auth);


export default router