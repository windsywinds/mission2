import React from 'react';

const CarCard = ({image, data, displayMsg}) => {

    return(
        
        <div className="flex flex-col items-center justify-center">
        {image && data ? (
          data.tagsResult.values.some((item) => item.name === "car") ? (
            <section className="flex flex-col">
              <div>
                <img src={image} width={320} height={180} alt={image} />
              </div>

              <p className="text-xl font-semibold">{data.captionResult.text}</p>

              <ul>
              {data.tagsResult.values
            .filter((item) => item.confidence > 0.9)
            .map((filteredItem) => (
              <li key={filteredItem.name}>
                <span>
                  {filteredItem.name} - Confidence level{" "}
                  {parseInt(filteredItem.confidence * 100)}%
                </span>
              </li>
            ))}
              </ul>
            </section>
          ) : (
            <section className="flex flex-col">
              {displayMsg && <p>{errorMessage.noCar}</p>}
            </section>
          )
        ) : (
          <section>{displayMsg && <p>{displayMsg}</p>}</section>
        )}
      </div>

    )
}

export default CarCard;