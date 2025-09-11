import { Link } from 'react-router-dom';
import PageBreadcrumb from './PageBreadCrumb'
import  { useState, useRef, useEffect } from 'react';
import { useAdminUserStore } from '../../store/useAdminUserStore';
import { useTranslation } from 'react-i18next';

const getRoleBadge = (role) => {
  const baseStyle = 'px-3 py-1 rounded-full text-xs font-semibold capitalize';
  switch (role) {
    case 'admin': return `${baseStyle} bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300`;
    default: return `${baseStyle} bg-gray-200 text-gray-700 dark:bg-gray-600/40 dark:text-gray-300`;
  }
};

const UserManagementTable = () => {
  const { t } = useTranslation('adminusers');
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateSort, setDateSort] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const { users, loading, error, fetchAllUsers, searchUsers, filterByRole, sortByDate } = useAdminUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      searchUsers(searchTerm);
    } else if (roleFilter === 'all' && dateSort === 'newest') {
      fetchAllUsers();
    }else{
      fetchAllUsers();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (roleFilter !== 'all') {
      filterByRole(roleFilter);
    } else if (searchTerm.trim() === '' && dateSort === 'newest') {
      fetchAllUsers();
    }
  }, [roleFilter]);

  useEffect(() => {
    if (dateSort !== 'newest') {
      sortByDate(dateSort);
    } else if (searchTerm.trim() === '' && roleFilter === 'all') {
      fetchAllUsers();
    }
  }, [dateSort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      } 
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayedData = showAll ? users : users.slice(0, 8);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 w-full">
      <PageBreadcrumb pageTitle={t('adminusers.breadcrumb', 'Users')} />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full md:flex-grow">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('adminusers.searchPlaceholder', 'Search by name or email...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative w-full md:w-auto" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 w-full justify-center md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{t('adminusers.filter', 'Filter')}</span>
          </button>
          {isFilterOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-4 z-20 border dark:border-gray-600 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('adminusers.roleLabel', 'Role')}</label>
                  <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="all"> All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('adminusers.sortByDate', 'Sort by Date')}</label>
                  <select value={dateSort} onChange={(e) => setDateSort(e.target.value)} className="w-full border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="newest">Newest First</option><option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {loading && <div className="text-center py-8 text-blue-500 font-semibold">Loading users...</div>} */}
      {error && <div className="text-center py-8 text-red-500 font-semibold">{error}</div>}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[3fr_3fr_2fr_1.5fr_1fr] gap-4 px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
            <span>{t('adminusers.name', 'Name')}</span><span>{t('adminusers.email', 'Email')}</span><span>{t('adminusers.joinedAt', 'Joined At')}</span><span className="text-center">{t('adminusers.role', 'Role')}</span><span className="text-right">{t('adminusers.diagnoses', 'Diagnoses')}</span>
          </div>
          <div>
            {displayedData && displayedData.length > 0 ? (displayedData.map((user) => (
              <Link key={user.id} to={`${user.name}`} 
                 className="grid grid-cols-[3fr_3fr_2fr_1.5fr_1fr] gap-4 items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 group">
                <div className="flex items-center gap-3"><img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover"/><span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{user.name}</span></div>
                <span className="text-gray-600 dark:text-gray-300 truncate">{user.email}</span>
                <span className="text-gray-500 dark:text-gray-400">{new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <div className="flex justify-center"><span className={getRoleBadge(user.role)}>{user.role}</span></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-right">{user.totalDiagnoses}</span>
              </Link>
            ))):(
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t('adminusers.noUsers', 'No users found')}</div>
            )}
          </div>
        </div>
      </div>
      {users.length > 8 && (
        <div className="text-center mt-4"><button onClick={() => setShowAll(!showAll)} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">{showAll ? t('adminusers.showLess', 'Show Less') : t('adminusers.seeAll', { count: users.length, defaultValue: `See All {{count}} Users` })}</button></div>
      )}
    </div>
  );
};

export default UserManagementTable;