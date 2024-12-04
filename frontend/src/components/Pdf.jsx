import React from 'react';
import "./Pdf.css";

export const Pdf = ({ pdfs }) => {
    return (
        <div>
            {pdfs.length === 0 ? (
                <p>No PDFs found for the selected criteria.</p>
            ) : (
                <div>
                    <h2>Available Previous Year Papers:</h2>
                    <ul>
                        {pdfs.map((pdf, index) => (
                            <li key={index} className="pdf-item">
                                {/* Show PDF thumbnail */}
                                <div className="pdf-thumbnail">
                                    <img
                                        src="/download (1).png"  // Correct reference to the image in the public folder
                                        alt={pdf.name}
                                        className="pdf-thumbnail-img"
                                    />
                                </div>


                                {/* Display the PDF name with the option to view it */}
                                <div className="pdf-details">
                                    <h3>{pdf.name}</h3>
                                    <button
                                        onClick={() => window.open(`https://drive.google.com/file/d/${pdf.id}/preview`, '_blank')}
                                        className="view-pdf-btn"
                                    >
                                        View PDF
                                    </button>
                                </div>

                                {/* Display PDF in iframe when clicked */}
                                <div className="pdf-iframe-container" id={`pdf-${pdf.id}`}>
                                    <iframe
                                        src={`https://drive.google.com/file/d/${pdf.id}/preview`}
                                        width="300"
                                        height="200"
                                        title={`PDF Preview: ${pdf.name}`}
                                        frameBorder="0"
                                        allow="autoplay"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
