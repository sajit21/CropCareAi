import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminUserStore } from '../../store/useAdminUserStore';
import PrivilegeChangeModal from './modal/PrivilegeChangeModal';
import { useTranslation } from 'react-i18next';


const getRoleBadge = (role) => {
  const baseStyle = 'px-3 py-1.5 rounded-full text-xs font-bold capitalize';
  switch (role) {
    case 'admin': return `${baseStyle} bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300`;
    default: return `${baseStyle} bg-gray-200 text-gray-700 dark:bg-gray-600/40 dark:text-gray-300`;
  }
};

const getConfidenceBadge = (score) => {
  if (score > 90) return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
  if (score > 70) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
};



const UserProfileHeader = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
      />
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
        <div className="mt-4">
          <span className={getRoleBadge(user.role)}>{t(`adminuserdetail.role.${user.role}`, user.role)}</span>
        </div>
      </div>
    </div>
  );
};

const DiagnosesTable = ({ diagnoses }) => {
  const { t } = useTranslation('adminuserdetail');
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('adminuserdetail.diagnosesHeader', 'User Diagnoses')}</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[1fr_1.5fr_2fr_2fr_1fr] gap-4 px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
            <span>{t('adminuserdetail.plant', 'Plant')}</span><span className="pl-12">{t('adminuserdetail.name', 'Name')}</span><span>{t('adminuserdetail.disease', 'Disease')}</span><span>{t('adminuserdetail.remedy', 'Remedy')}</span><span className="text-center">{t('adminuserdetail.confidence', 'Confidence')}</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {diagnoses && diagnoses.length > 0 ? diagnoses.map(d => (
              <div key={d.id} className="grid grid-cols-[1fr_1.5fr_2fr_2fr_1fr] gap-4 items-center px-4 py-3">
                <img src={d.plant.imageUrl} alt={d.plant.name} className="w-16 h-12 object-cover rounded-md"/>
                <span className="font-medium text-center text-gray-800 dark:text-gray-100">{d.disease.split(' ')[0]}</span>
                <span className="text-gray-700 dark:text-gray-300">{d.disease}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{d.remedy}</span>
                <div className="flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getConfidenceBadge(d.confidence)}`}>{(d?.confidence * 100).toFixed(2)}%</span>
                </div>
              </div>
            )):(
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                {t('adminuserdetail.noDiagnoses', 'No diagnoses available.')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewsList = ({ reviews }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('adminuserdetail.reviewsHeader', 'User Reviews')}</h2>
      <ul className="space-y-6">
        {reviews && reviews.length > 0 ? reviews.map((review) => (
          <li
            key={review.id}
            className="flex flex-col md:flex-row items-start gap-4 p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow transition"
          >
            <div className="w-16 h-16">
              <img
                src={review.reviewer.avatar}
                alt={review.reviewer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="text-lg font-semibold text-gray-800 dark:text-white">
                  {review.reviewer.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('adminuserdetail.plant', 'Plant')}:</span>{' '}
                  {review.plant}
                </div>
                <div>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('adminuserdetail.disease', 'Disease')}:</span>{' '}
                  {review.disease}
                </div>
                <div>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('adminuserdetail.accuracy', 'Accuracy')}:</span>{' '}
                  {review.Accuracy}%
                </div>
                <div>
                  <span className="font-medium text-gray-500 dark:text-gray-400">{t('adminuserdetail.suggestion', 'Suggestion')}:</span>{' '}
                  {review.Suggestion}
                </div>
              </div>
            </div>
          </li>
        )):(
          <li className="p-5 text-gray-500 dark:text-gray-400">
            {t('adminuserdetail.noReviews', 'No reviews available.')}
          </li>
        )}
      </ul>
    </div>
  );
};



const AdminActions = ({ user, onRoleChange }) => {
  const { t } = useTranslation();
  const [privilegesModalOpen, setPrivilegesModalOpen] = useState(false);
  const isUserAdmin = user.role === 'admin';
  const actionText = isUserAdmin ? t('adminuserdetail.revokeAdmin', 'Revoke Admin Privileges') : t('adminuserdetail.makeAdmin', 'Make Admin');
  const buttonClass = isUserAdmin 
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-green-600 hover:bg-green-700 text-white';

  return (
    isUserAdmin?null:(
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('adminuserdetail.adminControls', 'Admin Controls')}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {isUserAdmin ? t('adminuserdetail.demoteText', 'This will demote the user to a standard role.') : t('adminuserdetail.promoteText', 'This will grant the user full administrative privileges.')}
      </p>
      <button
        onClick={() => setPrivilegesModalOpen(true)}
        className={`w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition-colors ${buttonClass}`}
      >
        {actionText}
      </button>
      {privilegesModalOpen && (
        <PrivilegeChangeModal
          user={user}
          isOpen={privilegesModalOpen}
          onClose={() => setPrivilegesModalOpen(false)}
          onConfirm={onRoleChange}
        />
      )}
    </div>
    )
  );
};


export const dummyUserData = {
  user: {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe1@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a04258a24e29026702',
    role: 'user',
    joinedAt: '2023-05-15T10:00:00Z',
  },

  diagnoses: [
    {
      id: 'd1',
      plant: {
        name: 'Tomato',
        imageUrl: 'https://images.unsplash.com/photo-1587843403348-2036732978d3?w=400&auto=format&fit=crop',
      },
      disease: 'Blight',
      remedy: 'Apply copper-based fungicide weekly.',
      confidence: 95.8,
    },
    {
      id: 'd2',
      plant: {
        name: 'Rose',
        imageUrl: 'https://images.unsplash.com/photo-1599902688588-428637777174?w=400&auto=format&fit=crop',
      },
      disease: 'Powdery Mildew',
      remedy: 'Improve air circulation and use horticultural oil.',
      confidence: 89.2,
    },
    {
      id: 'd3',
      plant: {
        name: 'Bell Pepper',
        imageUrl: 'https://images.unsplash.com/photo-1601648769343-a6b644758b6e?w=400&auto=format&fit=crop',
      },
      disease: 'Healthy',
      remedy: 'No action needed. Continue standard care.',
      confidence: 99.1,
    },
    {
      id: 'd4',
      plant: {
        name: 'Cucumber',
        imageUrl: 'https://images.unsplash.com/photo-1574281316223-7313b6a9501c?w=400&auto=format&fit=crop',
      },
      disease: 'Anthracnose',
      remedy: 'Remove and destroy infected leaves.',
      confidence: 72.5,
    },
  ],

  // Section 3: Reviews other people have left for this user's diagnoses
  reviews: [
    {
      id: 'r1',
      reviewer: {
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', // Avatar for the reviewer
      },
      rating: 5,
      comment: 'The diagnosis was spot on! The remedy for Blight saved my entire tomato patch. Thank you so much!',
      date: '2023-09-01',
    },
    {
      id: 'r2',
      reviewer: {
        name: 'Chris Williams',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
      },
      rating: 4,
      comment: 'Good identification of Powdery Mildew on my roses. The advice was helpful. Would trust again.',
      date: '2023-08-22',
    },
  ],
};


const UserDetailPage = () => {
  const {name} = useParams();
  const [user, setUser] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleChanging, setRoleChanging] = useState(false);
  const [error, setError] = useState(null);
console.log(reviews)


    const navigate = useNavigate();
  const {
    getUserByUsername,
    getUserDiagnoses,
    getUserReviews,
    changeUserRole,
    loading: storeLoading,
    error: storeError,
    clearError
  } = useAdminUserStore();


  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    clearError();
    const fetchData = async () => {
      try {
        const userData = await getUserByUsername(name);
        if (!userData) throw new Error('User not found');
        if (!isMounted) return;
        setUser(userData);

        const [diagnosesData, reviewsData] = await Promise.all([
          getUserDiagnoses(userData._id || userData.id),
          getUserReviews(userData._id || userData.id)
        ]);
        if (!isMounted) return;
        setDiagnoses(diagnosesData || []);
        setReviews(reviewsData || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load user data');
        setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [name]);

  const handleRoleChange = async () => {
    if (!user) return;
    setRoleChanging(true);
    setError(null);
    clearError();
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      const updated = await changeUserRole(user._id || user.id, newRole);
      if (updated && updated.role) {
        setUser({ ...user, role: updated.role });
      } else {
        setUser({ ...user, role: newRole }); 
      }
    } catch (err) {
      setError(err?.message || 'Failed to change user role');
    }
    setRoleChanging(false);
  };

  if (loading || storeLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error || storeError) {
    return <div className="text-center py-10 text-red-500">{error || storeError}</div>;
  }
  if (!user) {
    return <div className="text-center py-10">User not found.</div>;
  }


  const diagnosesForTable = (diagnoses || []).map((d) => ({
    id: d._id || d.id,
    plant: {
      name: d.plantName || (d.plant && d.plant.name) || 'Unknown',
      imageUrl: d.image || (d.plant && d.plant.imageUrl) || '/default-plant.png',
    },
    disease: d.disease,
    remedy: d.remedy,
    confidence: d.confidence,
  }));

  const reviewsForList = (reviews || []).map((r, i) => ({
    id: r._id || r.id || i,
    reviewer: {
      name: r.reviewerName || (r.reviewer && r.reviewer.name) || 'Anonymous',
      avatar: (r.reviewer && r.reviewer.avatar) || '/default-avatar.png',
    },
    plant: r.plant || 'Unknown',
    disease: r.disease || 'Unknown',
    Accuracy: r.Accuracy || 0,
    Suggestion: r.Suggestion || 'No suggestion provided',
    date: r.date,
  }));

  const userForHeader = {
    avatar: user.profileImage || user.avatar || '/default-avatar.png',
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <UserProfileHeader user={userForHeader} />
        <DiagnosesTable diagnoses={diagnosesForTable} />
        <ReviewsList reviews={reviewsForList} />
        <AdminActions user={userForHeader} onRoleChange={handleRoleChange} />
        {roleChanging && <div className="text-center text-sm text-gray-500 mt-2">Updating role...</div>}
      </main>
    </div>
  );
};

export default UserDetailPage;

