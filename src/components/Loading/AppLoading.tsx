import { memo } from "react";
import { Modal, Spin, Typography, Image } from "antd";

export interface IAppLoading {
  isShowLoading: boolean;
  message?: string;
}

const AppLoading = ({ isShowLoading, message }: IAppLoading) => {
  return (
    <Modal
      open={isShowLoading}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      maskStyle={{ position: "absolute", zIndex: 9999 }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" style={{ marginBottom: 16 }} />
        {message && (
          <>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginTop: 8 }}
            >
              {message}
            </Typography.Text>
          </>
        )}
        <Typography.Text type="secondary">
          Wait.
        </Typography.Text>
      </div>
    </Modal>
  );
};

export default memo(AppLoading);
