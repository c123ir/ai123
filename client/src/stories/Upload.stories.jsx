import React, { useState } from 'react';
import { Upload, Button, message, Space, Image, Progress, Typography } from 'antd';
import { 
  UploadOutlined, 
  InboxOutlined, 
  PlusOutlined, 
  LoadingOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileExcelOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

export default {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// پیکربندی پایه برای تمام نمونه‌ها
const defaultProps = {
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} با موفقیت آپلود شد`);
    } else if (info.file.status === 'error') {
      message.error(`آپلود ${info.file.name} با خطا مواجه شد`);
    }
  },
  onPreview(file) {
    console.log('Preview:', file);
  },
};

// نمونه پایه
export const Default = {
  render: () => (
    <Upload {...defaultProps}>
      <Button icon={<UploadOutlined />}>انتخاب فایل</Button>
    </Upload>
  ),
};

// آپلود چند فایلی
export const MultipleFiles = {
  render: () => (
    <Upload
      {...defaultProps}
      multiple
      listType="text"
    >
      <Button icon={<UploadOutlined />}>آپلود چند فایل</Button>
    </Upload>
  ),
};

// آپلود با نمایش تصویر
export const PictureList = {
  render: () => (
    <Upload
      {...defaultProps}
      listType="picture"
      maxCount={5}
    >
      <Button icon={<UploadOutlined />}>آپلود عکس</Button>
    </Upload>
  ),
};

// آپلود با پیش‌نمایش کارتی
export const PictureCard = {
  render: () => (
    <Upload
      {...defaultProps}
      listType="picture-card"
      maxCount={3}
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>آپلود</div>
      </div>
    </Upload>
  ),
};

// آپلود با حالت کشیدن و رها کردن
export const Dragger = {
  render: () => (
    <Upload.Dragger {...defaultProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">برای آپلود فایل، کلیک کنید یا فایل را به اینجا بکشید</p>
      <p className="ant-upload-hint">
        پشتیبانی از آپلود تکی یا دسته‌ای. فایل‌های حساس را آپلود نکنید.
      </p>
    </Upload.Dragger>
  ),
};

// آپلود آواتار
export const AvatarUpload = {
  render: function AvatarUpload() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setLoading(false);
        // در حالت واقعی، آدرس تصویر از پاسخ سرور دریافت می‌شود
        // اینجا برای نمایش از یک تصویر نمونه استفاده می‌کنیم
        setImageUrl('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
        message.success('آواتار با موفقیت آپلود شد');
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>آپلود</div>
      </div>
    );

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="آواتار" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  },
};

// آپلود با پیشرفت سفارشی
export const CustomProgress = {
  render: function CustomProgressUpload() {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
      const newFileList = [...fileList];
      setUploading(true);
      
      // شبیه‌سازی آپلود
      setTimeout(() => {
        setFileList(prevList => 
          prevList.map(file => ({
            ...file,
            status: 'done',
            url: URL.createObjectURL(file.originFileObj),
          }))
        );
        setUploading(false);
        message.success('فایل‌ها با موفقیت آپلود شدند');
      }, 2000);
    };

    const props = {
      onRemove: (file) => {
        setFileList((prev) => {
          const index = prev.indexOf(file);
          const newFileList = [...prev];
          newFileList.splice(index, 1);
          return newFileList;
        });
      },
      beforeUpload: (file) => {
        setFileList((prev) => [...prev, file]);
        return false;
      },
      fileList,
      multiple: true,
    };

    return (
      <div>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} disabled={uploading}>انتخاب فایل</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0 || uploading}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'در حال آپلود...' : 'شروع آپلود'}
        </Button>
        {uploading && <Progress percent={Math.floor(Math.random() * 100)} status="active" style={{ marginTop: 16 }} />}
      </div>
    );
  },
};

// آپلود با نمایش نوع فایل
export const FileTypeDisplay = {
  render: () => (
    <Upload
      {...defaultProps}
      listType="text"
      iconRender={(file) => {
        const fileType = file.type;
        if (fileType.includes('pdf')) {
          return <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />;
        }
        if (fileType.includes('image')) {
          return <FileImageOutlined style={{ color: '#1890ff', fontSize: '24px' }} />;
        }
        if (fileType.includes('excel') || fileType.includes('sheet')) {
          return <FileExcelOutlined style={{ color: '#52c41a', fontSize: '24px' }} />;
        }
        return <UploadOutlined />;
      }}
    >
      <Button icon={<UploadOutlined />}>آپلود فایل با نمایش نوع فایل</Button>
    </Upload>
  ),
};

// آپلود با محدودیت نوع فایل
export const FileTypeLimit = {
  render: () => (
    <Upload
      {...defaultProps}
      beforeUpload={(file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('فقط فایل‌های JPG/PNG قابل آپلود هستند!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('اندازه تصویر باید کمتر از 2MB باشد!');
        }
        return isJpgOrPng && isLt2M;
      }}
      listType="picture-card"
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>آپلود تصویر</div>
      </div>
    </Upload>
  ),
}; 