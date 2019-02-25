const layout = {};
export const getScreenSize = () => {
    if (window.innerWidth > 1200) {
        return 'largeScreen';
    } else if (window.innerWidth <= 1200 && window.innerWidth > 992) {
        return 'computer';
    } else if (window.innerWidth <= 992 && window.innerWidth > 768) {
        return 'tablet';
    } else if (window.innerWidth <= 768) {
        return 'mobile';
    }
};

layout.getScreenSize = getScreenSize;
export default layout;
