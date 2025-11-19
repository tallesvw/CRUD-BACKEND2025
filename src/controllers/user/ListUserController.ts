import { Request, Response } from "express";
import prisma from '../../prisma/index.js'
import { AuthRequest } from '../../models/auth/AuthRequest.js';

  const ListUserController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 3;
  const skip = (page - 1) * itemsPerPage;

  try {
    const totalItems = await prisma.user.count(); 

    const users = await prisma.user.findMany({ 
      skip: skip,
      take: itemsPerPage,
      select: {
        id: true,
        user: true,
       
      },
    });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return res.status(200).json({
      data: users,
      pagination: {
        totalItems: totalItems,
        itemsPerPage: itemsPerPage,
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { ListUserController };