const sanitizeJobPayload = (body: any) => ({
  title: body.title,
  description: body.description,
  requirements: body.requirements,
  responsibilities: body.responsibilities,
  company: body.company,
  industry: body.industry,
  location: body.location,
  remote: body.remote,
  jobType: body.jobType,
  salaryRange: body.salaryRange,
  applicationUrl: body.applicationUrl,
  tags: body.tags,
  deadline: body.deadline,
});

export default sanitizeJobPayload;
