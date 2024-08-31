// Questionlist.jsx
import React from 'react';
import Question from './Question.jsx';
import Ad from '../Ad/Ad.jsx';

function Questionlist({ questionlist }) {
    const adsInterval = 3;
    const ads = [
        { brandName: 'Coca-Cola', imageUrl: 'https://api.freelogodesign.org/assets/blog/thumb/f4dae7732213491da3952f853c48f6dc_1176x840.jpg?t=638368678710000000', link: 'https://www.coca-cola.com/' },
        { brandName: 'Pepsi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg5_vHYfsk-nKv5GeTps-yGu_ZCtsJPad0vg&s', link: 'https://www.pepsi.com/' },
        { brandName: 'Dr Pepper', imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/200811155037-dr-pepper-cans-restricted.jpg?q=w_3000,h_2000,x_0,y_0,c_fill', link: 'https://www.drpepper.com/s/' }
    ];

    return (
        <>
            {questionlist?.data.map((question, index) => {
                const adIndex = Math.floor(index / adsInterval) % ads.length;
                const ad = ads[adIndex];

                console.log('Rendering ad for index:', adIndex, ad); // Debugging log

                return (
                    <React.Fragment key={question.id}>
                        <Question question={question} />
                        {(index + 1) % adsInterval === 0 && ad && (
                            <Ad
                                brandName={ad.brandName}
                                imageUrl={ad.imageUrl}
                                link={ad.link}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
}

export default Questionlist;
