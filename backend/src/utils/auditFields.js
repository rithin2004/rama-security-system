export const createAudit = (actorId) => {
  return {
    createdBy: actorId,
    updatedBy: actorId,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const updateAudit = (actorId) => {
  return {
    updatedBy: actorId,
    updatedAt: new Date()
  };
};