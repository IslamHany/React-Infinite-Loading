import React, {Fragment} from 'react';
import AdImage from '../AdImage/AdImage';
import dateCalc from '../../utils/dateCalc';
const ProductItem = (props) => {
  return(
    <Fragment>
      {props.faces.map((face, index) => {
        if((index+1) % 20 === 0){
          return(
            <Fragment key={face.id}>
              <div className="productItem">
                <div style={{fontSize: face.size + 'px'}}>{face.face}</div>
                <div>{face.price / 100 + " "}$</div>
                <div>{face.size + " "}px</div>
                <div>Created at: {dateCalc(face.date)}</div>
              </div>
              <AdImage />
            </Fragment>  
          );
        }
        return(
          <div key={face.id} className="productItem">
            <div style={{fontSize: face.size + 'px'}}>{face.face}</div>
            <div>{face.price / 100 + " "}$</div>
            <div>{face.size + " "}px</div>
            <div>Created at: {dateCalc(face.date)}</div>
          </div>
        );
      })}
    </Fragment>
  );
};
export default ProductItem;