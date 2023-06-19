import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props, imageWidth, imageHeigth) => (
  <ContentLoader
    speed={1}
    width={imageWidth}
    height={imageHeigth}
    viewBox="0 0 375 330"
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="60%" />
    <rect x="100" y="240" rx="2" ry="2" width="180" height="16" />
  </ContentLoader>
);

const MyLoaderWide = (props, imageWidth, imageHeigth) => (
  <ContentLoader
    speed={1}
    width={imageWidth}
    height={imageHeigth}
    viewBox="0 0 1200 600"
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="60%" />
    <rect x="350" y="450" rx="2" ry="2" width="600" height="40" />
  </ContentLoader>
);

const CatalogS = (props) => (
  <ContentLoader
    speed={1}
    width={345}
    height={190}
    viewBox="10 -5 345 190"
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    <rect x="15" y="1" rx="3" ry="3" width="120" height="170" />
    <rect x="145" y="3" rx="3" ry="3" width="290" height="18" />
    <rect x="145" y="45" rx="3" ry="3" width="116" height="11" />
    <rect x="145" y="77" rx="3" ry="3" width="46" height="11" />
    <rect x="195" y="77" rx="3" ry="3" width="72" height="11" />
    <rect x="145" y="110" rx="3" ry="3" width="100" height="11" />
    <rect x="145" y="135" rx="3" ry="3" width="67" height="11" />
    <rect x="145" y="159" rx="3" ry="3" width="53" height="11" />
  </ContentLoader>
);

const CatalogM = (props) => (
  <ContentLoader
    viewBox="0 0 600 300"
    width={600}
    height={300}
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    {/* 1 */}
    <rect x="30" y="58" rx="8" ry="8" width="250" height="165" />
    <rect x="30" y="238" rx="5" ry="5" width="200" height="18" />
    <rect x="30" y="278" rx="5" ry="5" width="120" height="15" />
    <rect x="30" y="318" rx="5" ry="5" width="190" height="10" />
    <rect x="30" y="338" rx="5" ry="5" width="190" height="10" />
    {/* 2 */}
    <rect x="312" y="58" rx="8" ry="8" width="250" height="165" />
    <rect x="312" y="238" rx="5" ry="5" width="200" height="18" />
    <rect x="312" y="278" rx="5" ry="5" width="120" height="15" />
    <rect x="312" y="318" rx="5" ry="5" width="190" height="10" />
    <rect x="312" y="338" rx="5" ry="5" width="190" height="10" />
  </ContentLoader>
);

const CatalogL = (props) => (
  <ContentLoader
    viewBox="0 0 845 300"
    width={845}
    height={300}
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    {/* 1 */}
    <rect x="10" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="10" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="10" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="10" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="10" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 2 */}
    <rect x="290" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="290" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="290" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="290" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="290" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 3 */}
    <rect x="570" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="570" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="570" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="570" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="570" y="330" rx="5" ry="5" width="190" height="10" />
  </ContentLoader>
);

const CatalogXl = (props) => (
  <ContentLoader
    viewBox="0 0 1410 300"
    width={1410}
    height={300}
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    {/* 1 */}
    <rect x="10" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="10" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="10" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="10" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="10" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 2 */}
    <rect x="290" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="290" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="290" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="290" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="290" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 3 */}
    <rect x="570" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="570" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="570" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="570" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="570" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 4 */}
    <rect x="850" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="850" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="850" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="850" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="850" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 5 */}
    <rect x="1130" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="1130" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="1130" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="1130" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="1130" y="330" rx="5" ry="5" width="190" height="10" />
  </ContentLoader>
);

const CatalogXxl = (props) => (
  <ContentLoader
    viewBox="0 0 1660 900"
    height={900}
    width={1660}
    backgroundColor="#ffffff"
    foregroundColor="#deddda"
    {...props}
  >
    {/* 1 */}
    <rect x="10" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="10" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="10" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="10" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="10" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 2 */}
    <rect x="290" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="290" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="290" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="290" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="290" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 3 */}
    <rect x="570" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="570" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="570" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="570" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="570" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 4 */}
    <rect x="850" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="850" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="850" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="850" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="850" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 5 */}
    <rect x="1130" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="1130" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="1130" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="1130" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="1130" y="330" rx="5" ry="5" width="190" height="10" />
    {/* 6 */}
    <rect x="1410" y="50" rx="8" ry="8" width="250" height="165" />
    <rect x="1410" y="230" rx="5" ry="5" width="200" height="18" />
    <rect x="1410" y="270" rx="5" ry="5" width="120" height="15" />
    <rect x="1410" y="310" rx="5" ry="5" width="190" height="10" />
    <rect x="1410" y="330" rx="5" ry="5" width="190" height="10" />

    {/* 7-------------------------------------------------- */}
    <rect x="10" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="10" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="10" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="10" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="10" y="730" rx="5" ry="5" width="190" height="10" />
    {/* 8 */}
    <rect x="290" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="290" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="290" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="290" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="290" y="730" rx="5" ry="5" width="190" height="10" />
    {/* 9 */}
    <rect x="570" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="570" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="570" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="570" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="570" y="730" rx="5" ry="5" width="190" height="10" />
    {/* 10 */}
    <rect x="850" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="850" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="850" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="850" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="850" y="730" rx="5" ry="5" width="190" height="10" />
    {/* 11 */}
    <rect x="1130" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="1130" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="1130" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="1130" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="1130" y="730" rx="5" ry="5" width="190" height="10" />
    {/* 12 */}
    <rect x="1410" y="450" rx="8" ry="8" width="250" height="165" />
    <rect x="1410" y="630" rx="5" ry="5" width="200" height="18" />
    <rect x="1410" y="670" rx="5" ry="5" width="120" height="15" />
    <rect x="1410" y="710" rx="5" ry="5" width="190" height="10" />
    <rect x="1410" y="730" rx="5" ry="5" width="190" height="10" />
  </ContentLoader>
);

export {
  MyLoader,
  MyLoaderWide,
  CatalogS,
  CatalogM,
  CatalogL,
  CatalogXl,
  CatalogXxl,
};
