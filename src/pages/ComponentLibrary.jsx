import React from 'react';
import StatCard from '../components/ui/StatCard';
import GradientButton from '../components/ui/GradientButton';
import AnimatedCard from '../components/ui/AnimatedCard';
import Badge from '../components/ui/Badge';
import DataTable from '../components/ui/DataTable';
import ProgressBar from '../components/ui/ProgressBar';
import Avatar from '../components/ui/Avatar';
import Alert from '../components/ui/Alert';
import InputField from '../components/ui/InputField';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';
import TabsComponent from '../components/ui/TabsComponent';
import Tooltip from '../components/ui/Tooltip';
import {
  FaTools,
  FaUsers,
  FaBox,
  FaChartBar,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaLink,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ComponentLibrary = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const [showModal, setShowModal] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(true);

  const tableData = [
    { id: 'CST-001', name: 'Rafi Hidayat', email: 'rafi@example.com', phone: '0812-3456-7890', status: 'Gold' },
    { id: 'CST-002', name: 'Citra Lestari', email: 'citra@example.com', phone: '0813-9876-5432', status: 'Silver' },
    { id: 'CST-003', name: 'Maya Putri', email: 'maya@example.com', phone: '0814-5555-6666', status: 'Gold' },
  ];

  const tableColumns = [
    { key: 'id', label: 'ID', render: (val) => <span className="font-semibold">{val}</span> },
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telepon' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <Badge variant={status === 'Gold' ? 'primary' : 'secondary'} size="sm">
          {status}
        </Badge>
      ),
    },
  ];

  const tabs = [
    {
      label: 'Overview',
      icon: FaChartBar,
      content: <p className="text-gray-600 dark:text-gray-400">Tab overview content dengan Framer Motion animation</p>,
    },
    {
      label: 'Analytics',
      icon: FaBox,
      content: <p className="text-gray-600 dark:text-gray-400">Tab analytics content dengan smooth transition</p>,
    },
    {
      label: 'Settings',
      icon: FaTools,
      content: <p className="text-gray-600 dark:text-gray-400">Tab settings content dengan motion animation</p>,
    },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400 font-semibold">
          Component Library
        </p>
        <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          15+ UI Components
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Koleksi komponen reusable dengan animasi modern & styling yang menarik
        </p>
      </div>

      {/* 1. StatCard Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. StatCard - Statistics Cards</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Beautiful gradient stat cards dengan icons dan animations
        </p>
        <div className="grid gap-4 xl:grid-cols-4">
          <StatCard
            icon={FaTools}
            label="Service Aktif"
            value="36"
            note="+8 dari kemarin"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            tone="bg-purple-600"
            delay={0}
          />
          <StatCard
            icon={FaUsers}
            label="Total Pelanggan"
            value="324"
            note="Bulan ini"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            tone="bg-red-600"
            delay={0.1}
          />
          <StatCard
            icon={FaBox}
            label="Sparepart"
            value="1,250"
            note="Stok tersedia"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            tone="bg-cyan-600"
            delay={0.2}
          />
          <StatCard
            icon={FaChartBar}
            label="Omset"
            value="Rp 48,7 jt"
            note="Bulan berjalan"
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            tone="bg-orange-600"
            delay={0.3}
          />
        </div>
      </section>

      {/* 2. GradientButton Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. GradientButton - Modern Buttons</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Button dengan gradient dan hover effects</p>
        <div className="flex flex-wrap gap-3">
          <GradientButton variant="primary" size="md" icon={FaTools}>
            Primary Button
          </GradientButton>
          <GradientButton variant="secondary" size="md">
            Secondary Button
          </GradientButton>
          <GradientButton variant="success" size="md" icon={FaCheckCircle}>
            Success Button
          </GradientButton>
          <GradientButton variant="danger" size="lg">
            Danger Button
          </GradientButton>
        </div>
      </section>

      {/* 3. Badge Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Badge - Status Badges</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Badges dengan berbagai variant dan size</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" size="md" icon={FaCheckCircle}>
            Completed
          </Badge>
          <Badge variant="success" size="md" icon={FaCheckCircle}>
            Active
          </Badge>
          <Badge variant="warning" size="md">
            Pending
          </Badge>
          <Badge variant="danger" size="lg">
            Urgent
          </Badge>
        </div>
      </section>

      {/* 4. InputField Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. InputField - Form Inputs</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Input fields dengan validation dan icons</p>
        <div className="grid gap-4 md:grid-cols-3">
          <InputField
            label="Nama Lengkap"
            placeholder="Masukkan nama..."
            icon={FaUsers}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <InputField
            label="Email"
            placeholder="email@example.com"
            icon={FaLink}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <InputField
            label="Telepon"
            placeholder="0812-3456-7890"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            success={formData.phone.length > 10}
          />
        </div>
      </section>

      {/* 5. ProgressBar Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. ProgressBar - Progress Indicators</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Animated progress bars dengan label</p>
        <div className="space-y-5">
          <ProgressBar
            value={75}
            max={100}
            label="Service Completion"
            showValue
            variant="primary"
            size="md"
          />
          <ProgressBar
            value={92}
            max={100}
            label="Customer Satisfaction"
            showValue
            variant="success"
            size="md"
          />
          <ProgressBar
            value={45}
            max={100}
            label="Inventory Level"
            showValue
            variant="warning"
            size="md"
          />
        </div>
      </section>

      {/* 6. Avatar Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Avatar - User Avatars</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Avatars dengan initials dan status indicators</p>
        <div className="flex gap-6 flex-wrap">
          <div>
            <Avatar name="Rafi Hidayat" size="lg" status="online" />
            <p className="text-xs text-center mt-2">Rafi Hidayat</p>
          </div>
          <div>
            <Avatar name="Citra Lestari" size="lg" status="away" />
            <p className="text-xs text-center mt-2">Citra Lestari</p>
          </div>
          <div>
            <Avatar name="Maya Putri" size="lg" status="offline" />
            <p className="text-xs text-center mt-2">Maya Putri</p>
          </div>
        </div>
      </section>

      {/* 7. Alert Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Alert - Alert Messages</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Dismissible alerts dengan berbagai variants</p>
        <div className="space-y-3">
          {showAlert && (
            <Alert
              variant="info"
              title="Info"
              message="Ini adalah alert info dengan icon dan closeable button"
              icon={FaInfoCircle}
              onClose={() => setShowAlert(false)}
            />
          )}
          <Alert
            variant="success"
            title="Success"
            message="Operasi berhasil dilakukan dengan sempurna"
            icon={FaCheckCircle}
            closeable={false}
          />
          <Alert variant="warning" title="Warning" message="Hati-hati dengan aksi ini" icon={FaExclamationTriangle} closeable={false} />
        </div>
      </section>

      {/* 8. Card Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Card - Container Cards</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Reusable card containers dengan header dan footer</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Service Overview" subtitle="Ringkasan service hari ini" icon={FaTools}>
            <p className="text-gray-600 dark:text-gray-400">
              Total 28 service aktif dengan 12 sudah selesai. Rating kepuasan pelanggan 4.8/5.0
            </p>
          </Card>
          <Card
            title="Quick Stats"
            subtitle="Statistics singkat"
            icon={FaChartBar}
            footer={
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total: 12,450</span>
                <span className="font-semibold text-blue-600">+15% dari minggu lalu</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">4.8★</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-gray-500">Uptime</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 9. DataTable Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. DataTable - Data Tables</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Table dengan pagination dan row animations</p>
        <DataTable columns={tableColumns} data={tableData} pageSize={5} striped hover />
      </section>

      {/* 10. TabsComponent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. TabsComponent - Tab Navigation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Tabs dengan smooth animation dan icons</p>
        <Card>
          <TabsComponent tabs={tabs} defaultTab={0} />
        </Card>
      </section>

      {/* 11. AnimatedCard Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">11. AnimatedCard - Animated Cards</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Cards dengan hover animations dan gradients</p>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard gradient hover className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl">
                <FaTools />
              </div>
              <div>
                <p className="font-semibold">Service</p>
                <p className="text-sm text-gray-500">28 aktif</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Service management system</p>
          </AnimatedCard>

          <AnimatedCard gradient hover className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl">
                <FaUsers />
              </div>
              <div>
                <p className="font-semibold">Customers</p>
                <p className="text-sm text-gray-500">324 registered</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customer relationship management</p>
          </AnimatedCard>

          <AnimatedCard gradient hover className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xl">
                <FaBox />
              </div>
              <div>
                <p className="font-semibold">Inventory</p>
                <p className="text-sm text-gray-500">1,250 items</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Spare parts inventory</p>
          </AnimatedCard>
        </div>
      </section>

      {/* 12. Modal Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">12. Modal - Modal Dialogs</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Beautiful modals dengan animations</p>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Open Modal
        </button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Modal Example" icon={FaQuestionCircle} size="md">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ini adalah contoh modal component dengan animations smooth dari Framer Motion.
          </p>
          <p className="text-gray-600 dark:text-gray-400">Modal ini fully customizable dengan berbagai size options.</p>
        </Modal>
      </section>

      {/* 13. Skeleton Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">13. Skeleton - Loading Skeletons</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Skeleton loaders dengan smooth animations</p>
        <div className="space-y-4">
          <Card>
            <div className="flex gap-4">
              <Skeleton variant="circle" width="w-12" height="h-12" />
              <div className="flex-1">
                <Skeleton height="h-4" width="w-3/4" className="mb-2" />
                <Skeleton height="h-3" width="w-full" count={2} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 14. Tooltip Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">14. Tooltip - Hover Tooltips</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Tooltips dengan berbagai posisi</p>
        <div className="flex gap-8 flex-wrap">
          <Tooltip content="Top tooltip" position="top">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">Top</button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">Bottom</button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">Left</button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">Right</button>
          </Tooltip>
        </div>
      </section>

      {/* 15. AnimatedCard als Showcase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">15. Complete Feature Showcase</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Kombinasi semua komponen dalam satu card</p>
        <AnimatedCard gradient hover className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">🎨 Modern UI Components</h3>
              <p className="text-gray-600 dark:text-gray-400">
                15+ fully reusable components dengan Framer Motion animations, Tailwind CSS styling, dan dark mode support
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Badge variant="primary">✓ Responsive</Badge>
              <Badge variant="success">✓ Animated</Badge>
              <Badge variant="warning">✓ Accessible</Badge>
              <Badge variant="primary">✓ Customizable</Badge>
            </div>

            <GradientButton variant="primary" size="lg" className="w-full">
              🚀 Mulai Gunakan Komponen
            </GradientButton>
          </div>
        </AnimatedCard>
      </section>
    </div>
  );
};

export default ComponentLibrary;
