'use client';

export default function LoadingSpinner() {
  return (
    <>
      <div className="loader" />
      <style jsx>{`
        .loader {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: block;
          margin: 15px auto;
          position: relative;
          color: #999; /* greyish tone */
          box-sizing: border-box;
          animation: animloader 1s linear infinite alternate;
        }

        @keyframes animloader {
          0% {
            box-shadow: -38px -12px #999, -14px 0 #999, 14px 0 #999, 38px 0 #999;
          }
          33% {
            box-shadow: -38px 0px #999, -14px -12px #999, 14px 0 #999, 38px 0 #999;
          }
          66% {
            box-shadow: -38px 0px #999, -14px 0 #999, 14px -12px #999, 38px 0 #999;
          }
          100% {
            box-shadow: -38px 0 #999, -14px 0 #999, 14px 0 #999, 38px -12px #999;
          }
        }
      `}</style>
    </>
  );
}