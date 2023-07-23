import React from 'react';

function Widget({ title, data }) {
  // Custom styles for the widget
  const widgetStyle = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
    marginBottom: '20px',
  };

  // Check if data is available and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('Widget data is not available or is not an array');
    return null; // Return early if data is not available
  }

  return (
    <div className="col-md-6">
      <div className="box box-primary" style={widgetStyle}>
        <div className="box-header with-border">
          <h3 className="box-title">{title}</h3>
        </div>
        <div className="box-body">
          <div className="row">
            {data.map((item) => (
              <div className="col-xs-12" key={item.id}>
                <div className="info-box">
                  <span className="info-box-icon bg-aqua">
                    {/* You can customize the icon here */}
                    <i className="fa fa-user"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">{item.name}</span>
                    <span className="info-box-number">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Widget };
