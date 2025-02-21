import { PUBLIC_API_URL } from '$env/static/public';

export const links = [
  { href: '/main', text: 'Dashboard', icon: 'bxs:dashboard' },
  null,
  { text: 'Menu Utama' },
  { href: '/main/menu/posts', text: 'Berita', icon: 'bx:news' },
  { href: '/main/menu/pages', text: 'Halaman', icon: 'bx:file' },
  // { href: '/main/menu/agenda', text: 'Agenda', icon: 'bx:notepad' },
  { href: '/main/menu/gallery', text: 'Galeri', icon: 'bx:image' },
  // { href: '/main/helpdesk', text: 'Helpdesk', icon: 'bx:chat' },
  null,
  { text: 'Manajemen Lowongan' },
  { href: '/main/vacancies/overview', text: 'Overview', icon: 'bx:news' },
  { href: '/main/vacancies/live', text: 'Live Ujian', icon: 'bx:news' },
  { href: '/main/vacancies/list', text: 'Daftar Lowongan', icon: 'bx:news' },
  { href: '/main/vacancies/applicants', text: 'Daftar Pelamar', icon: 'bx:news' },
  { href: '/main/vacancies/reports', text: 'Laporan', icon: 'bx:news' },
  null,
  { text: 'Manajemen Pertanyaan' },
  // { href: '/main/questions', text: 'Overview', icon: 'bx:news' },
  // { href: '/main/questions/template', text: 'Template Pertanyaan', icon: 'bx:news' },
  { href: '/main/questions/category', text: 'Kategori Pertanyaan', icon: 'bx:news' },
  { href: '/main/questions/list', text: 'Daftar Pertanyaan', icon: 'bx:news' },
  null,
  { text: 'Manajemen Aplikasi' },
  { href: '/main/settings/users', text: 'Pengguna', icon: 'bx:user' },
  { href: '/main/settings/roles', text: 'Hak Akses', icon: 'bx:award' },
  { href: '/main/settings/references', text: 'Referensi', icon: 'bx:data' },
  { href: `${PUBLIC_API_URL}/_/`, text: 'Pengaturan', icon: 'bx:cog', target: '_blank' }
];
