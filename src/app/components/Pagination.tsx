import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

function Pagination({ currentPage, totalPages }) {
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);

  return (
    <Box display="flex" justifyContent="center">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} passHref>
          <Button as="a" marginLeft={2} marginRight={2}>
            Prev
          </Button>
        </Link>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
        <Link key={page} href={`?page=${page}`} passHref>
          <Button as="a" marginLeft={2} marginRight={2} variant={currentPage === page ? 'solid' : 'outline'}>
            {page}
          </Button>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} passHref>
          <Button as="a" marginLeft={2} marginRight={2}>
            Next
          </Button>
        </Link>
      )}
    </Box>
  );
}

export default Pagination;
