export const Video = () => {
  return (
    <div className='video'>
      <video
        autoPlay //自動で再生させる
        loop //無限ループ
        muted //音を無くすミュート
        playsInline //iphoneで自動再生させるのに必要
        className='pointer-events-none object-cover'
        width='100%'
        height='100%'
      >
        <source src='planetPokeBall.mp4' type='video/mp4' />
      </video>
    </div>
  );
};
