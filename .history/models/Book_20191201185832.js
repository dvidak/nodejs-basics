const book = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      borrowedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      borrowedBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true,
    });
    
    return Book;
  };
  
module.exports = book;
