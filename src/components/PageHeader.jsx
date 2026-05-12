import React from 'react';
import { Fragment } from 'react';

const renderBreadcrumb = (breadcrumb) => {
  if (!breadcrumb) return null;

  const items = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb.split('/').map((item) => item.trim()).filter(Boolean);

  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mt-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            {index > 0 && <span className="text-slate-300">/</span>}
            <li>{item}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

const PageHeader = ({ title, breadcrumb, subtitle, children }) => {
  return (
    <div className="mb-10 pb-6 border-b border-slate-200">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</h1>
          {breadcrumb ? (
            renderBreadcrumb(breadcrumb)
          ) : (
            subtitle && (
              <div className="mt-4 text-sm text-slate-500 font-medium">{subtitle}</div>
            )
          )}
        </div>
        {children ? <div className="flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </div>
  );
};

export default PageHeader;
