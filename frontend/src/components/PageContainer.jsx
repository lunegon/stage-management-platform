function PageContainer({ title, subtitle, children }) {
  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export default PageContainer;
