"use strict";
//app.post("/createUser", async (req: Request<never>, res: Response) => {
//   const { profile, name, email, password } = req.body;
//   const user: User = await db.user.create({
//     data: {
//       name,
//       email,
//       password,
//       profile: {
//         connect: { name: profile },
//       },
//     },
//   });
//   res.json(user);
// });
// app.post("/createPost", async (req: Request<never>, res: Response) => {
//   const { title, content, authorEmail } = req.body;
//   const post: Post = await db.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(post);
// });
// app.post("/createProfile", async (req: Request<never>, res: Response) => {
//   const { name } = req.body;
//   const profile: Profile = await db.profile.create({
//     data: {
//       name,
//     },
//   });
//   res.json(profile);
// });
// app.post("/createPermission", async (req: Request<never>, res: Response) => {
//   const { profile, role, resource } = req.body;
//   const permission: Permission = await db.permission.create({
//     data: {
//       role,
//       resource,
//       profile: {
//         connect: {
//           name: profile,
//         },
//       },
//     },
//   });
//   res.json(permission);
// });
// app.get("/getProfiles", async (req: Request, res: Response) => {
//   const profiles: Profile[] = await db.profile.findMany({
//     include: { user: true },
//   });
//   res.json(profiles);
// });
// app.get("/getUsers", async (req: Request, res: Response) => {
//   const users: User[] = await db.user.findMany({
//     include: {
//       profile: {
//         select: {
//           id: true,
//           name: true,
//           createdAt: true,
//           permission: {
//             select: {
//               id: true,
//               resource: true,
//               role: true,
//               createdAt: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   res.json(users);
// });
// app.get("/getPosts", async (req: Request, res: Response) => {
//   const posts: Post[] = await db.post.findMany({
//     where: { published: false },
//     include: {
//       author: {
//         select: {
//           name: true,
//           email: true,
//         },
//       },
//     },
//   });
//   res.json(posts);
// });
// app.put("/publish/:id", async (req: Request<never>, res: Response) => {
//   const { id } = req.params;
//   const post: Post = await db.post.update({
//     where: { id },
//     data: { published: true },
//   });
//   res.json(post);
// });
// app.delete("/user/:id", async (req: Request<never>, res: Response) => {
//   const { id } = req.params;
//   const user: User = await db.user.delete({
//     where: {
//       id,
//     },
//   });
//   res.json(user);
// });
//# sourceMappingURL=t.js.map