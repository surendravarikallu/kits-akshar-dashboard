import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getMenuByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const menu = await prisma.menu.findUnique({
      where: { name: name as string },
      include: {
        items: {
          where: { parentId: null },
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    return res.status(200).json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
