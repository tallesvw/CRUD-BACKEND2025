import prisma from "../../prisma/index.js";

export interface PaginatedUsersResult {
  users: {
    id: number;
    user: string;
  }[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

const ListUserService = async (
  page: number,
  itemsPerPage: number
): Promise<PaginatedUsersResult> => {

  const skip = (page - 1) * itemsPerPage;

  const [totalItems, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      skip,
      take: itemsPerPage,
      select: {
        id: true,
        user: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    users,
    totalItems,
    itemsPerPage,
    currentPage: page,
    totalPages,
  };
};

export default { ListUserService, };