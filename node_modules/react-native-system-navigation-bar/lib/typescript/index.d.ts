declare var SystemNavigationBar: {
    navigationHide: () => Promise<any>;
    navigationShow: () => Promise<any>;
    leanBack: () => Promise<any>;
    immersive: () => Promise<any>;
    stickyImmersive: () => Promise<any>;
    lowProfile: () => Promise<any>;
    lightNavigationBar: (light?: boolean | undefined) => Promise<any>;
    setNavigationColor: (color: string | number, light?: boolean | undefined) => Promise<any>;
    setNavigationBarDividerColor: (color: string | number) => Promise<any>;
    setNavigationBarContrastEnforced: (enforceContrast?: boolean | undefined) => Promise<any>;
    fullScreen: (enable?: boolean | undefined) => Promise<any>;
};
export default SystemNavigationBar;
