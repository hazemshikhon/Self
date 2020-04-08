import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  ar: {
    HOME: 'الرئيسية',
    offers: 'عروض',
    cart: 'عربتك',
    PROFILE: 'الشخصية',
    ad: 'اضف للعربه',
    edit:'تعديل ملفك الشخصي',
    addresses:'عنواين',
    logout: 'تسجيل الخروج' ,
    orders: 'المشتريات',
    lang:'تحويل اللغه الي الانجليزيه'
  },
  en: {
    HOME: 'Home',
    offers: 'Offers',
    cart: 'Cart',
    PROFILE: 'Profile',
    ad: 'Add to Cart',
    edit:'Edit Profile',
    addresses: 'addresses',
    logout: 'Log out',
    orders: 'Orders',
    lang:'Switch language to arbic'
    
  }
});

export default strings
