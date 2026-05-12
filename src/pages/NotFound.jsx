import React from 'react';
import ErrorPage from '../components/ErrorPage';

const NotFound = () => {
  return (
    <ErrorPage
      code="404"
      description="Halaman tidak ditemukan. Silakan periksa kembali URL atau kembali ke dashboard untuk melanjutkan aktivitas Anda."
      image="https://images.unsplash.com/photo-1517519014922-8fc01afa70a9?auto=format&fit=crop&w=900&q=80"
    />
  );
};

export default NotFound;