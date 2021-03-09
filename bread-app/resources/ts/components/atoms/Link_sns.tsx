import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

type SNSProps = ({
    sns: any
})

const LinkSNS: React.FC<SNSProps> = ({sns}) =>{
    const snsInfo: any = JSON.parse(sns);

    return(
        <div className = "m-sns-btns">
            {snsInfo &&
                <ul className="m-sns-btns__list">
                    {snsInfo.instagram && <li className = "m-sns-btns__list__btn instagram"><a href={snsInfo.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram}/></a></li>}
                    {snsInfo.facebook && <li className = "m-sns-btns__list__btn facebook"><a href={snsInfo.facebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF}/></a></li>}
                    {snsInfo.twitter && <li className = "m-sns-btns__list__btn twitter"><a href={snsInfo.twitter} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter}/></a></li>}
                    {snsInfo.other && <li className = "m-sns-btns__list__btn other"><a href={snsInfo.other} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLink}/></a></li>}
                </ul>
            }
        </div>
    );
}

export default LinkSNS;