const {
  Employee,
  EmployeeProfile,
  EmployeeFamily,
  Education,
  sequelize,
} = require("../models/index");

const getAllEmployee = async (req, res, next) => {
  try {
    const allEmployee = await Employee.findAll();
    if (!allEmployee) {
        res.status(200).json([]);
    }
    res.status(200).json(allEmployee);
  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: {
        id,
      },
      include: [
        {
          model: EmployeeProfile,
          as: "profile",
        },
        {
          model: EmployeeFamily,
          as: "family",
        },
        {
          model: Education,
          as: "education",
        },
      ],
    });

    if (!employee) {
      throw { name: "EMPLOYEE_NOT_FOUND" };
    }

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      nik,
      name,
      is_active,
      start_date,
      end_date,
      profile,
      education,
      family,
    } = req.body;
    const { place_of_birth, date_of_birth, gender, is_married, prof_pict } =
      profile;
    const { name: education_name, level, description } = education;

    const employee = await Employee.create(
      {
        nik,
        name,
        is_active,
        start_date,
        end_date,
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction }
    );

    await EmployeeProfile.create(
      {
        employee_id: employee.id,
        place_of_birth,
        date_of_birth,
        gender,
        is_married,
        prof_pict,
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction }
    );

    await Education.create(
      {
        employee_id: employee.id,
        name: education_name,
        level,
        description,
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction }
    );

    if (family && family.length > 0) {
      const payload = await family.map((el) => {
        return {
          employee_id: employee.id,
          name: el.name,
          identifier: el.identifier,
          job: el.job,
          place_of_birth: el.place_of_birth,
          date_of_birth: el.date_of_birth,
          religion: el.religion,
          is_life: el.is_life,
          is_divorced: el.is_divorced,
          relation_status: el.relation_status,
          created_by: "admin",
          updated_by: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        };
      });
      await EmployeeFamily.bulkCreate(payload, { transaction });
    }

    await transaction.commit();
    res.status(201).json({ message: "Success create employee" });
  } catch (error) {
    await transaction.rollback();
    console.log(error, "this is error");
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw { name: "EMPLOYEE_NOT_FOUND" };
    }
    const {
      nik,
      name,
      is_active,
      start_date,
      end_date,
      profile,
      education,
      family,
    } = req.body;

    await Employee.update(
      {
        nik,
        name,
        is_active,
        start_date,
        end_date,
        updated_by: "admin",
        updated_at: new Date(),
      },
      { where: { id }, transaction }
    );

    if (profile) {
      const { place_of_birth, date_of_birth, gender, is_married, prof_pict } =
        profile;
      await EmployeeProfile.update(
        {
          place_of_birth,
          date_of_birth,
          gender,
          is_married,
          prof_pict,
          updated_by: "admin",
          updated_at: new Date(),
        },
        {
          where: {
            employee_id: id,
          },
          transaction,
        }
      );
    }

    if (education) {
      const { name: education_name, level, description } = education;
      await Education.update(
        {
          name: education_name,
          level,
          description,
          updated_by: "admin",
          updated_at: new Date(),
        },
        {
          where: {
            employee_id: id,
          },
          transaction,
        }
      );
    }

    if (family && family.length > 0) {
      const newFamily = [];
      for (const el of family) {
        const payload = {
          name: el.name,
          identifier: el.identifier,
          job: el.job,
          place_of_birth: el.place_of_birth,
          date_of_birth: el.date_of_birth,
          religion: el.religion,
          is_life: el.is_life,
          is_divorced: el.is_divorced,
          relation_status: el.relation_status,
          updated_by: "admin",
          updated_at: new Date(),
        };
        if (el.id) {
          await EmployeeFamily.update(payload, {
            where: { id: el.id },
            transaction,
          });
        } else {
          newFamily.push({
            employee_id: id,
            name: el.name,
            identifier: el.identifier,
            job: el.job,
            place_of_birth: el.place_of_birth,
            date_of_birth: el.date_of_birth,
            religion: el.religion,
            is_life: el.is_life,
            is_divorced: el.is_divorced,
            relation_status: el.relation_status,
            created_by: "admin",
            updated_by: "admin",
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }
      if (newFamily.length > 0) {
        await EmployeeFamily.bulkCreate(newFamily, { transaction });
      }
    }

    await transaction.commit();
    res.status(201).json({ message: "Success Update employee" });
  } catch (error) {
    await transaction.rollback();
    console.log(error, "this is error");
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw { name: "EMPLOYEE_NOT_FOUND" };
    }
    await EmployeeProfile.destroy({
      where: { employee_id: id },
      transaction,
    });

    await EmployeeFamily.destroy({
      where: { employee_id: id },
      transaction,
    });

    await Education.destroy({
      where: { employee_id: id },
      transaction,
    });

    await Employee.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();
    res.status(200).json({ message: "Success delete employee" });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

const employeeReport = async (req, res, next) => {
  try {
    const report = await sequelize.query(
        `select e.id as employee_id, 
        e.nik, e.name, 
        e.is_active, 
        ep.gender, 
        concat(extract(year from AGE(ep.date_of_birth)), ' Years Old') as age, 
        ed.name as school_name, 
        ed.level,
        CONCAT(
            CASE 
            WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 
            THEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) || ' Suami' 
            ELSE '' 
            END,
            CASE 
            WHEN COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 
            THEN COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) || ' Istri' 
            ELSE '' 
            END,
            CASE 
            WHEN COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) > 0 
            THEN CASE 
                WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 THEN ' & ' 
                ELSE '' 
                END || COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) || ' Anak ' 
            ELSE '' 
            END,
            CASE 
            WHEN COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) > 0 
            THEN CASE 
                WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) > 0 THEN ' & ' 
                ELSE '' 
                END || COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) || ' Anak Sambung' 
            ELSE '' 
            end,
            CASE 
            WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) = 0
            THEN '-'
            ELSE '' 
            END
        ) AS family_data
        from employee e
        left join employee_profile ep on ep.employee_id = e.id 
        left join education ed on ed.employee_id = e.id
        left join employee_family ef on ef.employee_id = e.id
        group by e.id, e.nik, e.is_active, ep.gender, ep.date_of_birth, ed.name, ed.level;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!report) {
        res.status(200).json([]);
    }
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

// Get One Employee (with all relation to profile, family & education)
// o Create Employee and it’s profile, family, & education
// o Update Employee and it’s profile, family & education
// o Delete Employee
// o Report Employee data (format laporan seperti soal nomor 4)

module.exports = {
  getAllEmployee,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  employeeReport,
};
