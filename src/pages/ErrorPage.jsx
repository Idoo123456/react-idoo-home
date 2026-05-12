import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

const errorDetails = {
  '400': {
    code: '400',
    description: 'Permintaan tidak valid. Silakan periksa kembali data dan format yang Anda kirimkan.',
    image: 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/07/000-HTTP-Error-400.png',
  },
  '401': {
    code: '401',
    description: 'Akses ditolak. Anda perlu masuk atau meminta izin untuk melanjutkan.',
    image: 'https://i.pinimg.com/1200x/bf/8b/3d/bf8b3db9c6bda6927d0a09ebbe59ad6b.jpg',
  },
  '403': {
    code: '403',
    description: 'Akses terlarang. Anda tidak memiliki izin untuk melihat halaman ini.',
    image: 'https://i.pinimg.com/736x/93/eb/9c/93eb9cc606042ae15c8eb36826708920.jpg',
  },
};

const ErrorPageRoute = () => {
  const { code } = useParams();
  const error = errorDetails[code];

  if (!code) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ErrorPage
      code={error?.code || code}
      description={error?.description || 'Terjadi kesalahan pada permintaan Anda. Silakan coba lagi nanti.'}
      image={error?.image || 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'}
    />
  );
};

export default ErrorPageRoute;
