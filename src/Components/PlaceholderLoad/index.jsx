import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (

    <>
        <li>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={124}
                viewBox="0 0 100% 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <rect x="22" y="50" rx="3" ry="3" width="410" height="6" />
                <rect x="22" y="68" rx="3" ry="3" width="410" height="6" />
                <rect x="22" y="87" rx="3" ry="3" width="380" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>

        <li>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={124}
                viewBox="0 0 100% 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <rect x="22" y="50" rx="3" ry="3" width="410" height="6" />
                <rect x="22" y="67" rx="3" ry="3" width="380" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>

        <li>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={324}
                viewBox="0 0 100% 304"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="22" y="52" rx="3" ry="3" width="265" height="230" />
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>
        <li>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={124}
                viewBox="0 0 100% 104"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <rect x="22" y="50" rx="3" ry="3" width="410" height="6" />
                <rect x="22" y="67" rx="3" ry="3" width="380" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>
        <li>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={124}
                viewBox="0 0 100% 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <rect x="22" y="50" rx="3" ry="3" width="410" height="6" />
                <rect x="22" y="67" rx="3" ry="3" width="380" height="6" />
                <rect x="22" y="84" rx="3" ry="3" width="178" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>
        <li tabIndex={1}>
            <ContentLoader
                speed={2}
                width={'100%'}
                height={324}
                viewBox="0 0 100% 304"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="22" y="52" rx="3" ry="3" width="265" height="230" />
                <rect x="57" y="13" rx="3" ry="3" width="77" height="6" />
                <rect x="150" y="13" rx="3" ry="3" width="47" height="6" />
                <circle cx="32" cy="15" r="15" />
            </ContentLoader>
        </li>
    </>
)

export default MyLoader;