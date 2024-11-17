import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRouter } from '../routes/api/user-routes';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // DONE: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); //403 is forbidden
      }

      req.user = user as JwtPayload;
      return next(); //calls nect from the props
    });
  } else {
    res.sendStatus(401); //401 is unathorized
  }
};

//implement userRouter as it's being imported above
userRouter.get('/profile', authenticateToken, (req: Request, res: Response) => {
  res.send(`Hey there, ${req.user?.username}`);
})

export default userRouter;