import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames";
import './header.scss';
import BasketPopupBasketPopup from "./components/basket-popup";
import {debounce} from "../../../helpers/debounce";


type headerContainerProps = {
display: string;
isActiveBasket: boolean;
    basketTextContent: string;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    basketItems: { id: number;
        src: string;
        itemPrice: number;
        itemName: string;
        itemParamOneName: string;
        itemParamOneValue: number;
        itemParamOneUnit : string;
        itemParamTwoValue: number;
        itemParamTwoName: string;
        itemParamTwoUnit: string;
        itemQuantity: number;} [];
    closePopup: () => void;
    togglePopup: () => void;
}

export const Header: React.FC<headerContainerProps> = ({
                           display,
                           isActiveBasket,
                           basketTextContent,
                           handleMouseEnter,
                           handleMouseLeave,
                           basketItems,
                           closePopup,
                           togglePopup

                       }) => {

    const [menuDisplay, setMenuDisplay] = useState<string>('flex');

    const handleToggleMenu: () => void = () => {
        // removeOnScroll()
        if (menuDisplay === "none") {
            setMenuDisplay('flex');
        } else
        setMenuDisplay('none');
    };


        React.useEffect(() => {
            function handleResize() {
               // if(window.innerWidth > 770) {
                   console.log('handleResize')
                   // show header when viewport bigger then mobile then scroll to top
                   setVisible(true);
                   setMenuDisplay('flex');
                   window.scrollTo(0, 0)
               // }

            }

            window.addEventListener('resize', handleResize)

            if(window.innerWidth > 770) {
            console.log('RESIZED REMOVE')

                return () => window.removeEventListener('resize', handleResize);
            }



    }, []);


    const [prevScrollPos, setPrevScrollPos] = useState(0);
const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {

        if(window.innerWidth > 320 && window.innerWidth < 770) {
            setMenuDisplay('none');
            // find current scroll position
            const currentScrollPos = window.pageYOffset;
            // set state based on location info (explained in more detail below)
            setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 170) || currentScrollPos < 30);

            // set state to new scroll position
            setPrevScrollPos(currentScrollPos);
        }

    }, 50);

    useEffect(() => {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);

            }, [prevScrollPos, visible, handleScroll]);

    return (
        <>

        <div className="main-header"
             style={{visibility: visible ? 'visible' : 'hidden' }}
         >

        <div className="main-header__wrapper">
            <button onClick={handleToggleMenu}
                    className={cn(`nav-main--button`, {
                        [`nav-main--button-open`]: menuDisplay === 'flex'
                    })}
            />
            <div className="nav-container">

                <ul className="nav-container container-two" style={{display: menuDisplay}} >
                    <NavLink  to="/catalog" className="nav-container__item nav-catalog">
                        Каталог товаров</NavLink>

                    <NavLink to="/form" className="nav-container__item nav-form">Вязание на заказ</NavLink>
                </ul>

                <NavLink  to="/" exact className="nav-container__item nav-main">

                </NavLink>

            </div>


            <div className="helper-container">
                <div className="helper-container__search" style={{display: menuDisplay}}>Поиск по сайту</div>

                <div onClick={togglePopup}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                     className={cn(`helper-container__basket`,
                         {
                             [`helper-container__basket-active`]:
                             isActiveBasket
                         })}>Корзина:  &nbsp;
                    {basketTextContent}</div>
                <BasketPopupBasketPopup
                    display={display}
                    basketItems={basketItems}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    closePopup={closePopup}
                />
                <br/>
                <div className="free-delivery-tablet">Бесплатная доставка по России</div>
            </div>

        </div>

        <div className="container-filter">
            <ul className="container-filter__filter">
                <li className="container-filter__filter__item new-arrivals">Новые поступления</li>
                <li className="container-filter__filter__item sale">Распродажа</li>
            </ul>

            <div className="free-delivery">Бесплатная доставка по России</div>
        </div>
    </div>
            </>
    );
};
export default Header;
