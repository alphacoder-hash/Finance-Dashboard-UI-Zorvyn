import React from 'react';

const PageHeader = ({ title, subtitle, rightContent }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{subtitle}</p>}
      </div>
      {rightContent && (
        <div style={{ display: 'flex', gap: '12px' }}>
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
