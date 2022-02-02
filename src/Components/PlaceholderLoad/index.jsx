import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
    <ul
        style={{
            overflow: 'hidden'
        }}
    >
        <li>
            <ContentLoader
                speed={2}
                width={476}
                height={124}
                viewBox="0 0 476 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="51" y="18" rx="3" ry="3" width="88" height="6" />
                <rect x="158" y="18" rx="3" ry="3" width="52" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </li>

        <li>
            <ContentLoader
                speed={2}
                width={476}
                height={124}
                viewBox="0 0 476 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="51" y="18" rx="3" ry="3" width="88" height="6" />
                <rect x="158" y="18" rx="3" ry="3" width="52" height="6" />
                <rect x="3" y="62" rx="3" ry="3" width="380" height="6" />
                <rect x="3" y="79" rx="3" ry="3" width="178" height="6" />
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </li>

        <li>
            <ContentLoader
                speed={2}
                width={476}
                height={324}
                viewBox="0 0 476 304"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="51" y="18" rx="3" ry="3" width="88" height="6" />
                <rect x="158" y="18" rx="3" ry="3" width="52" height="6" />
                <rect x="3" y="52" rx="3" ry="3" width="312" height="230" />
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </li>
        <li>
            <ContentLoader
                speed={2}
                width={476}
                height={124}
                viewBox="0 0 476 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="51" y="18" rx="3" ry="3" width="88" height="6" />
                <rect x="158" y="18" rx="3" ry="3" width="52" height="6" />
                <rect x="3" y="62" rx="3" ry="3" width="380" height="6" />
                <rect x="3" y="79" rx="3" ry="3" width="178" height="6" />
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </li>
        <li>
            <ContentLoader
                speed={2}
                width={476}
                height={124}
                viewBox="0 0 476 124"
                backgroundColor="#4f4f4f"
                foregroundColor="#8d8d8d"
                {...props}
            >
                <rect x="51" y="18" rx="3" ry="3" width="88" height="6" />
                <rect x="158" y="18" rx="3" ry="3" width="52" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </li>
    </ul>
)

export default MyLoader