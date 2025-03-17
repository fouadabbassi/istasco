import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // تنظيف المستمع على التفكيك
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width <= 640) {
    // الهاتف
    return (
      <>
        <div
          style={{
            width: "100%",
            position: "relative",
            height: "90vh",
            textAlign: "center",
            fontSize: "180px",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "0px",
              right: "0px",
              left: "0px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "110px",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#161622",
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: "501px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <b
                    style={{
                      width: "367px",
                      position: "relative",
                      letterSpacing: "-0.5px",
                      display: "inline-block",
                      height: "110px",
                      flexShrink: "0",
                    }}
                  >
                    404
                  </b>
                  <div
                    style={{
                      alignSelf: "stretch",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: "16px 0px 24px",
                      fontSize: "28px",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 0px 8px",
                      }}
                    >
                      <b
                        style={{
                          flex: "1",
                          position: "relative",
                          lineHeight: "120%",
                        }}
                      >
                        Page Not Found
                      </b>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "9px 0px 0px",
                        fontSize: "18px",
                        color: "rgba(255, 255, 255, 0.75)",
                      }}
                    >
                      <div
                        style={{
                          flex: "1",
                          position: "relative",
                          lineHeight: "140%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis semper convallis euismod vestibulum in pharetra.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (width <= 992) {
    // التابلت
    return (
      <>
        <div
          style={{
            width: "100%",
            position: "relative",
            height: "90vh",
            textAlign: "center",
            fontSize: "180px",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "0px",
              right: "0px",
              left: "0px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#161622",
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "48px 24px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <b
                    style={{
                      width: "367px",
                      position: "relative",
                      letterSpacing: "-0.5px",
                      display: "inline-block",
                      height: "180px",
                      flexShrink: "0",
                    }}
                  >
                    404
                  </b>
                  <div
                    style={{
                      alignSelf: "stretch",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: "30px 0px 40px",
                      fontSize: "48px",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 0px 24px",
                      }}
                    >
                      <b
                        style={{
                          flex: "1",
                          position: "relative",
                          letterSpacing: "0.25px",
                          lineHeight: "120%",
                        }}
                      >
                        Page Not Found
                      </b>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "9px 0px 0px",
                        fontSize: "20px",
                        color: "rgba(255, 255, 255, 0.75)",
                      }}
                    >
                      <div
                        style={{
                          flex: "1",
                          position: "relative",
                          lineHeight: "140%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis semper convallis euismod vestibulum in pharetra.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // الحاسوب
    return (
      <>
        <div
          style={{
            width: "100%",
            position: "relative",
            height: "90vh",
            textAlign: "center",
            fontSize: "180px",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "0px",
              right: "0px",
              left: "0px",
              height: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                flex: "1",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  backgroundColor: "#161622",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "64px 48px",
                }}
              >
                <div
                  style={{
                    width: "533px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <b
                    style={{
                      width: "367px",
                      position: "relative",
                      letterSpacing: "-0.5px",
                      display: "inline-block",
                      height: "180px",
                      flexShrink: "0",
                    }}
                  >
                    404
                  </b>
                  <div
                    style={{
                      alignSelf: "stretch",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: "30px 0px 40px",
                      fontSize: "48px",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "0px 0px 24px",
                      }}
                    >
                      <b
                        style={{
                          flex: "1",
                          position: "relative",
                          letterSpacing: "0.25px",
                          lineHeight: "120%",
                        }}
                      >
                        Page Not Found
                      </b>
                    </div>
                    <div
                      style={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "9px 0px 0px",
                        fontSize: "20px",
                        color: "rgba(255, 255, 255, 0.75)",
                      }}
                    >
                      <div
                        style={{
                          flex: "1",
                          position: "relative",
                          lineHeight: "140%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis semper convallis euismod vestibulum in pharetra.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default NotFoundPage;
