import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: { sectionType: true }
        }
      }
    });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    return res.status(200).json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePageSection = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { content } = req.body;

    const updatedSection = await prisma.pageSection.update({
      where: { id },
      data: { content }
    });

    return res.status(200).json(updatedSection);
  } catch (error) {
    console.error('Error updating section:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
