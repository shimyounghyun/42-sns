const privateResolver = (resovlerFunction) => async (
    parent,
    args,
    context,
    info
  ) => {
    if (!context.req || !context.req.user) {
      throw new Error("No JWT. I refuse to proceed");
    }
    const resolved = await resovlerFunction(parent, args, context, info);
    return resolved;
  };
  
  export default privateResolver;